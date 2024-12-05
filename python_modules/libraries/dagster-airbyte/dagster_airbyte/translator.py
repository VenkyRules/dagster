from typing import Any, List, Mapping, Optional, Sequence

from dagster._annotations import experimental
from dagster._core.definitions.asset_spec import AssetSpec
from dagster._record import record
from dagster._serdes.serdes import whitelist_for_serdes
from dagster._utils.cached_method import cached_method

from dagster_airbyte.utils import get_airbyte_connection_table_name


@record
class AirbyteConnectionTableProps:
    table_name: str
    stream_prefix: Optional[str]
    stream_name: str
    json_schema: Mapping[str, Any]
    connection_id: str
    connection_name: str
    database: Optional[str]
    schema: Optional[str]


@whitelist_for_serdes
@record
class AirbyteConnection:
    """Represents an Airbyte connection, based on data as returned from the API."""

    id: str
    name: str
    stream_prefix: Optional[str]
    streams: Mapping[str, "AirbyteStream"]
    destination_id: str

    @classmethod
    def from_connection_details(
        cls,
        connection_details: Mapping[str, Any],
    ) -> "AirbyteConnection":
        return cls(
            id=connection_details["connectionId"],
            name=connection_details["name"],
            stream_prefix=connection_details.get("prefix"),
            streams={
                stream_details["stream"]["name"]: AirbyteStream.from_stream_details(
                    stream_details=stream_details
                )
                for stream_details in connection_details.get("syncCatalog", {}).get("streams", [])
            },
            destination_id=connection_details["destinationId"],
        )


@whitelist_for_serdes
@record
class AirbyteDestination:
    """Represents an Airbyte destination, based on data as returned from the API."""

    id: str
    database: Optional[str]
    schema: Optional[str]

    @classmethod
    def from_destination_details(
        cls,
        destination_details: Mapping[str, Any],
    ) -> "AirbyteDestination":
        return cls(
            id=destination_details["destinationId"],
            database=destination_details["configuration"].get("database"),
            schema=destination_details["configuration"].get("schema"),
        )


@whitelist_for_serdes
@record
class AirbyteStream:
    """Represents an Airbyte stream, based on data as returned from the API.
    A stream in Airbyte corresponds to a table.
    """

    name: str
    selected: bool
    json_schema: Mapping[str, Any]

    @classmethod
    def from_stream_details(
        cls,
        stream_details: Mapping[str, Any],
    ) -> "AirbyteStream":
        return cls(
            name=stream_details["stream"]["name"],
            selected=stream_details["config"].get("selected", False),
            json_schema=stream_details["stream"].get("jsonSchema", {}),
        )


@record
class AirbyteWorkspaceData:
    """A record representing all content in an Airbyte workspace.
    This applies to both Airbyte OSS and Cloud.
    """

    connections_by_id: Mapping[str, AirbyteConnection]
    destinations_by_id: Mapping[str, AirbyteDestination]

    @cached_method
    def to_airbyte_connection_table_props_data(self) -> Sequence[AirbyteConnectionTableProps]:
        """Method that converts a `AirbyteWorkspaceData` object
        to a collection of `AirbyteConnectionTableProps` objects.
        """
        data: List[AirbyteConnectionTableProps] = []

        for connection in self.connections_by_id.values():
            destination = self.destinations_by_id[connection.destination_id]

            for stream in connection.streams.values():
                if stream.selected:
                    data.append(
                        AirbyteConnectionTableProps(
                            table_name=get_airbyte_connection_table_name(
                                stream_prefix=connection.stream_prefix,
                                stream_name=stream.name,
                            ),
                            stream_prefix=connection.stream_prefix,
                            stream_name=stream.name,
                            json_schema=stream.json_schema,
                            connection_id=connection.id,
                            connection_name=connection.name,
                            database=destination.database,
                            schema=destination.schema,
                        )
                    )

        return data


@experimental
class DagsterAirbyteTranslator:
    """Translator class which converts a `AirbyteConnectionTableProps` object into AssetSpecs.
    Subclass this class to implement custom logic how to translate Airbyte content into asset spec.
    """

    def get_asset_spec(self, props: AirbyteConnectionTableProps) -> AssetSpec:
        """Get the AssetSpec for a table synced by an Airbyte connection."""
        raise NotImplementedError()

import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import React from "react";
import { FaCircleInfo } from "react-icons/fa6";

interface Props {
  field: string;
  tooltip?: string;
}

const ResultField = ({ field, tooltip }: Props) => {
  return (
    <Group gap={5}>
      <Text size="sm">{field}</Text>
      {tooltip && (
        <Tooltip label={tooltip} multiline maw={400}>
          <ActionIcon radius={10} size={14}>
            <FaCircleInfo />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
};

export default ResultField;

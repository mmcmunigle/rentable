import { ActionIcon, Group, NavLink, Text, Tooltip } from "@mantine/core";
import React from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

interface Props {
  label: string;
  tooltip: string;
  link?: string;
}

const TooltipIcon = ({ label, tooltip, link }: Props) => {
  return (
    <Group justify="space-between">
      <Text size="sm" fw={500}>
        {label}
      </Text>
      {!link && (
        <Tooltip label={tooltip} multiline maw={400}>
          <ActionIcon radius={10} size="xs">
            <FaCircleInfo />
          </ActionIcon>
        </Tooltip>
      )}
      {link && (
        <Tooltip label={tooltip} multiline maw={400}>
          <NavLink
            p={0}
            w="20px"
            target="_blank"
            href={link}
            label={
              <ActionIcon radius={15} size="xs">
                <FaExternalLinkSquareAlt />
              </ActionIcon>
            }
          />
        </Tooltip>
      )}
    </Group>
  );
};

export default TooltipIcon;

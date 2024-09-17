import { ActionIcon, Box } from "@mantine/core";
import React, { forwardRef } from "react";
import { FaCircleInfo } from "react-icons/fa6";

const InfoIcon = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box ref={ref} {...props}>
      <ActionIcon variant="light" size="xs">
        <FaCircleInfo />
      </ActionIcon>
    </Box>
  );
});

export default InfoIcon;

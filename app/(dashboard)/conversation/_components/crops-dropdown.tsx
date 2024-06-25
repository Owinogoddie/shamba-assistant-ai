"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialogStore } from "@/hooks/useDialog";

export function CropsDropDown() {
  const [crop, setCrop] = React.useState("");

  const { value, setValue } = useDialogStore();
  React.useEffect(() => {
    setValue(crop);
  }, [crop,setValue]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{crop ? crop : "Select Crop"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Crops available</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={crop} onValueChange={setCrop}>
          <DropdownMenuRadioItem value="coffee">Coffee</DropdownMenuRadioItem>
          {/* <DropdownMenuRadioItem value="beans">Beans</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="maize">Maize</DropdownMenuRadioItem> */}
          <DropdownMenuRadioItem value="general">general</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

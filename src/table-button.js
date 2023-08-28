import React from "react";
import { Button, Dialog, DialogBody } from "@blueprintjs/core";
import { TableEditor } from "./table/TableEditor";
import { getTableURL } from "./table-to-svg";

export const SvgTableButton = ({ store, element }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!element.custom?.isTable) {
      return;
    }
    const { src, ratio } = getTableURL(element.custom.state);
    element.set({
      src,
      height: element.width / ratio
    });
  }, [element, element?.custom]);

  if (!element.custom?.isTable) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        minimal
      >
        Edit table
      </Button>
      <Dialog
        title="Edit table"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogBody>
          <TableEditor
            data={element.custom?.state.data}
            columns={element.custom?.state.columns}
            onChange={(state) => {
              element.set({
                custom: {
                  ...element.custom,
                  state
                }
              });
            }}
          />
        </DialogBody>
        {/* <DialogFooter
          actions={
            <Button
              intent="primary"
              text="Close"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          }
        /> */}
      </Dialog>
    </>
  );
};

import React from "react";

import { Form, FormGroup, Input, Label } from "reactstrap";

const Player = props => {
  return (
    <React.Fragment>
      <Form>
        <Label for="exampleEmail" style={{ marginRight: "0.75rem" }}>
          Which Player To Start the Game:{" "}
        </Label>
        <FormGroup check inline>
          <Label check>
            <Input
              type="radio"
              name="radio"
              value="X"
              disabled={props.disabled}
              onChange={props.choosePlayer}
              checked={props.selectedRadio === "X" ? true : null}
            />
            X
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input
              type="radio"
              name="radio"
              value="O"
              disabled={props.disabled}
              onChange={props.choosePlayer}
              checked={props.selectedRadio === "O" ? true : null}
            />
            O
          </Label>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default Player;

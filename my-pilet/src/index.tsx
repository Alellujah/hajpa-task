import * as React from "react";
import { PiletApi } from "piral-test";
import { DummyFeature } from "./features/DummyFeature";

const tile = (
  <div className="tile rows-2 cols-2">
    <div className="teaser">
      <a href="/table">Custom table</a>
      <br />
      for seeing data!
    </div>
  </div>
);

export function setup(app: PiletApi) {
  app.registerTile(() => tile);
  app.registerPage("/table", DummyFeature);
}

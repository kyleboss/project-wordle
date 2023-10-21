import React, { useMemo } from "react";

import { GAME_STATE_LOST, GAME_STATE_WON } from "../../constants";

function Banner({ children, status }) {
  const className = useMemo(() => {
    switch (status) {
      case GAME_STATE_LOST:
        return "banner sad";
      case GAME_STATE_WON:
        return "banner happy";
      default:
        return "banner";
    }
  }, [status]);
  return <div className={className}>{children}</div>;
}

export default Banner;

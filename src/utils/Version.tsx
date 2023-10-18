import React from "react";
import pkg from "../../package.json";

const Version: any = () => <p style={{ fontFamily: "Helvetica" }}>{pkg.version}</p>;

export default Version;

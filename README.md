# EpicHomesToHuskHomesImporter

Importer for EpicHomes data to HuskHomes data

## Usage

```
<place usermap.yml from EpicHomes at the current directory>
<edit index.ts and fill OVW_UUID (overworld), NET_UUID (nether), END_UUID (end), change world names if required, and optionally change timestamp>
yarn
yarn tsc
yarn start
<sql syntax should be dumped to stdout, now run them on the HuskHomes database (clear out any data first!)>
```
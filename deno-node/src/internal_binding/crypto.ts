// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright Joyent, Inc. and Node.js contributors. All rights reserved. MIT license.

import { notImplemented } from "@deno-ext/node/_utils";

export { timingSafeEqual } from "@deno-ext/node/internal_binding/_timingSafeEqual.ts";

export function getFipsCrypto(): boolean {
  notImplemented("crypto.getFipsCrypto");
}

export function setFipsCrypto(_fips: boolean) {
  notImplemented("crypto.setFipsCrypto");
}

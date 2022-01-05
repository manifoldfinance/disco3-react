#!/bin/bash
function check() {
	node -e 'process.stdout.write("sha256-");process.stdin.pipe(crypto.createHash("sha256").setEncoding("base64")).pipe(process.stdout)' <"$@"
}

@ECHO OFF

MKDIR src\protos 2> NUL

ECHO Compiling %~1...

grpc_tools_node_protoc ^
    --plugin=protoc-gen-ts=%CD%/node_modules/.bin/protoc-gen-ts.cmd ^
    --ts_out=grpc_js:%CD%/src/protos ^
    --js_out=import_style=commonjs:%CD%/src/protos ^
    --grpc_out=grpc_js:%CD%/src/protos ^
    --proto_path ../kl-proto ^
    %~1

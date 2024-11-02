/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "trpc-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const trpc = new sst.aws.Function("Trpc", {
      url: true,
      handler: "index.handler",
    });

    const client = new sst.aws.Function("Client", {
      url: true,
      link: [trpc],
      handler: "client.handler",
    });

    return {
      api: trpc.url,
      client: client.url,
    };
  },
});

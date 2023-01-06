# Chainloop UI frontend source code

Work-in-progress web interface for the [Chainloop project](https://chainloop.dev/).

Some of the functionality is not implemented yet. For now, to complete the experience you can pair it with the existing [Command Line Tool](https://docs.chainloop.dev/getting-started/installation)

## Development

### Configuration

The UI is built on top of react + nextjs so the following requirements need to be present.

- `nodejs > 16`
- `nvm use`
- `yarn`

The UI connects to a Chainloop Control Plane backend through `grpc`. It comes pre-configured pointing to Chainloops production server but it can be changed by modifying [`.env.development`](.env.development) and [`.env.production`](.env.production) environment files.

### Run development server

You can run the development server by invoking

```bash
make run
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Pre-packaged container images

A set of pre-packaged container images can be found [here](https://github.com/chainloop-dev/frontend/pkgs/container/frontend)

```
# Run the UI and make it accessible via http://localhost:3000
docker run -it -p 3000:3000 ghcr.io/chainloop-dev/frontend
```

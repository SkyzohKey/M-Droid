# `src/components`

This folder **ONLY** holds _dumb_ components. **Smart components goes in `src/containers`**.

A component is basically everything that compose the app and does not deal with Redux stores nor state. A component can have it's own internal state (React Native style) for handling how it render under certain conditions. A better approch is to use props to make the component reusable.

A component **MUST ALWAYS** have specified `PropTypes` and defaults in order to save us from **many** trouble.

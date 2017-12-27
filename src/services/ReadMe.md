# `src/services`

This directory keeps some `services` files. A service is an utility class/set of functions to make actions content shorter and easier to test as it's possible to mock services.

Some usage of services: the app API wrapper, 3rd-parties APIs wrappers, device API wrappers, etc. That folder should have been called `wrappers` but sounds confusing with `containers` so `services`is a better name there.

A service file basically export a set of functions (or a class) that then can be called from an action (or an action's thunk) for easier & more maintainable code. It also allow to have less HTTP code & more Promises code in the action creators.

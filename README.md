A very simple implementation of "virtual scrolling" not using any
library but relying on ```requestAnimationFrame``` (there are still
a couple of caveats, like the loading of the images, flickering in
Safari etc.).

## Install

1. Clone the repository
2. Go to the project folder and install the dependencies:

    ```
    $ npm install
    ```

## Development

For development run:

```
$ gulp dev
```

To get a production-style build run:

```
$ gulp
```

Both will start a server and open the example page.

## Tests

Unit:

```
$ gulp unit
```

Acceptance:

```
$ gulp acceptance
```

## License

[MIT License](http://opensource.org/licenses/MIT)

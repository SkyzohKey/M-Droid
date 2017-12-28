# ![M-Droid logo](assets/images/icons/M-Droid@mdpi.png) M-Droid

### Unofficial Material Designed client for F-Droid!

This is M-Droid, a drop-in replacement for the F-Droid client. It provides the same features but in a Material Design way that is both nice to see and easy to use.

This project started because I hate the new F-Droid UI while still loving the actual software. And as I like React-Native, this is a good project for me.

#### Table of Contents

* [How it works?](#how-it-works)
* [Screenshots](#screenshots)
* [Contributing](#contributing)
* [Compile & run](#compile--run)
* [Donations](#donations)
* [License](#license)

## How it works?

Basically you add your repositories of choice (along with the F-Droid, F-Droid Archive & Guardian ones) then the client will send some GET requests to actually get the content of the `https://${repoBaseUrl}/index.xml` file who's contains the repo.

Then it parse that file by converting the XML to JSON format, for better code efficiency. Cache the parsed stuffs and display the informations in a great way for the user.

That's Simple (c).

## Screenshots

The screenshots may not be up-to-date. This is currently an early stage for the project and I'll try to update screenshots as many as possible.

![1st step: showing a list of repositories, and parsing them.](https://i.imgur.com/veU5SFF.png)

## Contributing

This is a fairly simple project so I doubt anyone is willing to contribute, but if that's the case it super simple. You can either help to [catch bugs and report them](https://github.com/SkyzohKey/M-Droid/issues), [send a pull request](https://github.com/SkyzohKey/M-Droid/pulls) (ESLint is configured) or just show some interest in the project!

## Compile & run

This is a React Native project and by so it is super simple to build&run. Just do the following in a shell:

```sh
# Get the source & dependencies
$ git clone https://github.com/SkyzohKey/M-Droid.git
$ cd M-Droid
$ yarn # or npm install

# Run the packager
$ react-native start

# Start the app on a simulator/device
$ react-native run-android --variant=debug # or production for enhanced perfs.
```

## Donations

I currently work on this project during my free-time, but also during my work-time. As I'm my own boss, I take work time to work on personnal projects that I really believes in. But during this time, I don't win any money. I'm not doing that for money.

Anyway, if you consider support me, you can pay me a pack of Monster's cans for moore productive coding, :D.

I accept donations in form of Monero, Bitcoin, Etherum & IntenseCoin (in that order).

```
1. Monero (XMR): 47XpVhUHahViCZHuZPc2Z6ivLraidX7AxbM8b2StdPcQGwjDGY14eqj9ippW7Pdrqj9d2y4xvwChzePQAqG1NvqQ775FKxg
2. Bitcoin (BTC/XBT): 18BqyV9mNbFLi5HNNnfUprnPJyJDFP59Xh
3. Etherum (ETH): 0x56E3273D42B40d47E122fF62108dEDC974A4206e
4. IntenseCoin (ITNS): iz5F814eDfX7gbUucu17E5YUBGADYGLDRhMfKQjfXwv9S1UDPaJKcgEiUUWm9vDeJ7JVcPWo7kZRmTFtcVcssc1h28zguw8iE
```

If you wish to support me, but doesn't have money for, you can still message me on Wire and give me some free hugs! :D

* Wire handle: **@SkyzohKey**

## License

This project is licensed under [The MIT License](LICENSE).

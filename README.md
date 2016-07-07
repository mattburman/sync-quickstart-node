# Sync Quickstart for Node.js

This application should give you a ready-made starting point for writing your
own real-time apps with Sync. Before we begin, we need to collect
all the config values we need to run the application:

| Config Value  | Description |
| :-------------  |:------------- |
Service Instance SID | Like a database for your Sync data - generate one with the curl command below.
Account SID | Your primary Twilio account identifier - find this [in the console here](https://www.twilio.com/console).
API Key | Used to authenticate - [Use the IP Messaging dev tools to generate one here](https://www.twilio.com/user/account/ip-messaging/dev-tools/api-keys).
API Secret | Used to authenticate - [just like the above, you'll get one here](https://www.twilio.com/user/account/ip-messaging/dev-tools/api-keys).

## Temporary: Generating a Service Instance

During the Sync developer preview, you will need to generate Sync service
instances via API until the Console GUI is available. Using the API key pair you
generated above, generate a service instance via REST API with this curl command:

```bash
curl -X POST https://preview.twilio.com/Sync/Services \
 -d 'FriendlyName=MySyncServiceInstance' \
 -u 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_api_secret'
```

## A Note on API Keys

When you generate an API key pair at the URLs above, your API Secret will only
be shown once - make sure to save this in a secure location, 
or possibly your `~/.bash_profile`.

## Setting Up The Node.js Application

Create a configuration file for your application:

```bash
cp config.sample.js config.js
```

Edit `config.js` with the four configuration parameters we gathered from above.

Next, we need to install our dependencies from npm:

```bash
npm install
```

Now we should be all set! Run the application using the `node` command.

```bash
node .
```

Your application should now be running at http://localhost:3000. Open this page
in a couple browsers or tabs, and start syncing!

## License

MIT

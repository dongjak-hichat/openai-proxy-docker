# 构建

```bash
docker stop aiworld-plugin-proxy && \
docker rm aiworld-plugin-proxy  && \
docker build --no-cache -t aiworld/plugin-proxy:latest . && \
docker run --name aiworld-plugin-proxy -d -p 9017:9017 aiworld/plugin-proxy:latest
```

## How to use
Just:

```shell
sudo docker run -d -p 9017:9017 shawnai/openai-proxy-docker:latest
```

Then, you can use it by ```YOURIP:9017```

> For example, the proxied OpenAI Chat Completion API will be: ```YOURIP:9017/v1/chat/completions```
> 
> It should be the same as ```api.openai.com/v1/chat/completions```

For detailed usage of OpenAI API, please check: [API Reference](https://platform.openai.com/docs/api-reference/introduction)

## How to maintain
Use PM2 to scale up this proxy application accross CPU(s):
- Listing managed processes
> ```shell
> docker exec -it <container-id> pm2 list
> ```
- Monitoring CPU/Usage of each process
> ```shell
> docker exec -it <container-id> pm2 monit
> ```
- 0sec downtime reload all applications
> ```shell
> docker exec -it <container-id> pm2 reload all
> ```

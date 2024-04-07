# Jump-Host

### Что это?
Специальная ВМ, которая обладает белым IP для proxy-доступа ко всем машинкам закрытой сети. IP статичный и зафиксированный `158.160.49.46`.

### Как пользоваться?

Для начала нужно добавить закрытый ключ от целевой машины в SSH Agent:
```shell
ssh-add ~/.ssh/vkr
```

А дальше есть два способа использования Jump-Host: с предварительной конфигурацией и без неё

В обоих случаях мы пользуемся тем фактом, что в сети развёрнута закрытая dns-зона, так что с этой тачки можно резолвить доменные имена других виртуальных машин.

#### С предварительной конфигурацией ( рекомендуемый )
1. Добавить в ~/.ssh/config следующие строки:
```py
Host vkr-jump-host
  User aanazaretyan        # User of Jump-Host

  HostName 158.160.49.46   # IP of Jump-Host

  ForwardAgent yes         # (required) Forwarding
                           # agent with Private key

  AddKeysToAgent ask       # Ask which keys include in agent

  IdentityFile ~/.ssh/vkr  # Path to private key for
                           # connecting to Host-Jump

Host vkr-target
  User aanazaretyan              # User of target machine

  HostName target.internal.rane  # FQDN of target machine

  ProxyJump vkr-jump-host        # Host of Jump-Host
```
где User, Hostname и IdentityFile могут отличаться

2. Подключиться к целевому хосту:
```shell
ssh vkr-target
```

#### Без конфигурации
```shell
ssh -A -i ~/.ssh/vkr -J aanazaretyan@158.160.49.46 aanazaretyan@target.internal.rane
```

terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }

  backend "s3" {
    endpoints = {
      s3 = "https://storage.yandexcloud.net"
    }
    bucket = "vkr-terraform-state"
    region = "ru-central1"
    key    = "terraform.tfstate"

    skip_region_validation      = true
    skip_credentials_validation = true
    skip_requesting_account_id  = true # Необходимая опция Terraform для версии 1.6.1 и старше.
    skip_s3_checksum            = true # Необходимая опция при описании бэкенда для Terraform версии 1.6.3 и старше.
  }

  required_version = ">= 0.13"
}

provider "yandex" {
  token     = var.yandex_token
  cloud_id  = var.yandex_cloud_id
  folder_id = var.yandex_folder_id
  zone      = var.yandex_zone
}

module "service_accounts" {
  source = "./tf_modules/service-accounts"

  folder_id = var.yandex_folder_id
  service_accounts = [
    {
      name = "terraform-editor"
      description = "Сервисный аккаунт для изменения конфигураций с помощью tf"
      role = "editor"
      create_static_key = false
    },
    {
      name = "s3-editor"
      description = "Сервисный аккаунт для изменения файлов в S3"
      role = "storage.editor"
      create_static_key = true
    },
  ]
}

module "network" {
  source = "./tf_modules/network"

  yandex_zone = var.yandex_zone
  dns_zone = "internal.rane."
  subnet_name = "vkr"
}

module "gitlab-runners" {
  source = "./tf_modules/compute"

  yandex_zone = var.yandex_zone
  instance_name = "gitlab-runner-${count.index}"
  count = 1

  subnet = module.network.subnet
  dns = module.network.dns

  ssh_users = var.ssh_users
}

module "jump-hosts" {
  source = "./tf_modules/compute"

  yandex_zone = var.yandex_zone
  instance_name = "jump-host-${count.index}"
  count = 1

  subnet = module.network.subnet
  dns = module.network.dns
  use_external_ip = true

  ssh_users = var.ssh_users
}

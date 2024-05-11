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

module "k8s-network" {
  source = "./tf_modules/network"

  yandex_zone = var.yandex_zone
  folder_id = var.yandex_folder_id

  dns_zone = "k8s.rane."
  subnet_name = "k8s"

  vpc_v4_networks = [ "10.10.1.0/24" ]
}

module "k8s" {
  source = "./tf_modules/managed-k8s"

  folder_id = var.yandex_folder_id

  cluster_name = "rane-k8s"
  subnet = module.k8s-network.subnet
  network = module.k8s-network.network
}

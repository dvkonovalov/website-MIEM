resource "yandex_iam_service_account" "service_account" {
  name        = "managed-k8s-admin"
  description = "Сервисный аккаунт для управления Кластером k8s"
  folder_id   = var.folder_id
  lifecycle {
    prevent_destroy = true
  }
}

resource "yandex_resourcemanager_folder_iam_member" "service_account_role" {
  for_each = toset(["k8s.clusters.agent", "vpc.publicAdmin", "editor"])

  folder_id   = var.folder_id
  role        = each.key
  member      = "serviceAccount:${yandex_iam_service_account.service_account.id}"
  lifecycle {
    prevent_destroy = true
  }
}

resource "yandex_iam_service_account" "node_service_account" {
  name        = "managed-k8s-node-admin"
  description = "Сервисный аккаунт для управления узлами кластера k8s"
  folder_id   = var.folder_id
  lifecycle {
    prevent_destroy = true
  }
}

resource "yandex_resourcemanager_folder_iam_member" "node_service_account_role" {
  for_each = toset(["container-registry.images.puller"])

  folder_id   = var.folder_id
  role        = each.key
  member      = "serviceAccount:${yandex_iam_service_account.node_service_account.id}"
  lifecycle {
    prevent_destroy = true
  }
}

terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }

  required_version = ">= 0.13"
}

resource "yandex_kubernetes_cluster" "rane_cluster" {
  name                    = var.cluster_name
  network_id              = var.network.id
  service_account_id      = yandex_iam_service_account.service_account.id
  node_service_account_id = yandex_iam_service_account.node_service_account.id
  release_channel         = "STABLE"

  master {
    zonal {
      zone      = var.subnet.zone
      subnet_id = var.subnet.id
    }

    public_ip = true
  }
}

resource "yandex_kubernetes_node_group" "rane_cluster_node_group" {
  cluster_id  = yandex_kubernetes_cluster.rane_cluster.id
  name        = "${var.cluster_name}-node-group"

  instance_template {
    platform_id = "standard-v2"

    network_interface {
      nat        = false
      subnet_ids = [ var.subnet.id ]
    }

    resources {
      memory = 2
      cores  = 2
      core_fraction = 50
    }

    boot_disk {
      type = "network-hdd"
      size = 64
    }

    container_runtime {
      type = "containerd"
    }
  }

  scale_policy {
    fixed_scale {
      size = 1
    }
  }

  allocation_policy {
    location {
      zone = var.subnet.zone
    }
  }
}

resource "yandex_vpc_address" "public_ip_1" {
  name                = "k8s-balancer-public-ip-1"
  deletion_protection = true

  external_ipv4_address {
    zone_id = var.subnet.zone
  }
}

resource "yandex_vpc_address" "public_ip_2" {
  name                = "k8s-balancer-public-ip-2"
  deletion_protection = true

  external_ipv4_address {
    zone_id = var.subnet.zone
  }
}

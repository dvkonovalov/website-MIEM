terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }

  required_version = ">= 0.13"
}

resource "yandex_vpc_network" "vpc_net" {
  name = "${var.subnet_name}-vpc-net"
}

resource "yandex_vpc_subnet" "subnet" {
  name           = "${var.subnet_name}-subnet"
  zone           = var.yandex_zone
  network_id     = yandex_vpc_network.vpc_net.id
  v4_cidr_blocks = var.vpc_v4_networks
}

resource "yandex_dns_zone" "dns" {
  zone             = "internal.rane."
  name             = "${var.subnet_name}-dns"
  public           = false
  private_networks = [ yandex_vpc_network.vpc_net.id ]
}

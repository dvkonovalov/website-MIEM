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
  route_table_id = yandex_vpc_route_table.rt.id
}

resource "yandex_vpc_gateway" "nat_gateway" {
  folder_id = var.folder_id
  name      = "gateway"
  shared_egress_gateway {}
}

resource "yandex_vpc_route_table" "rt" {
  folder_id      = var.folder_id
  name       = "${var.subnet_name}-route-table"
  network_id = yandex_vpc_network.vpc_net.id

  static_route {
    destination_prefix = "0.0.0.0/0"
    gateway_id         = yandex_vpc_gateway.nat_gateway.id
  }
}

resource "yandex_dns_zone" "dns" {
  zone             = "internal.rane."
  name             = "${var.subnet_name}-dns"
  public           = false
  private_networks = [ yandex_vpc_network.vpc_net.id ]
}

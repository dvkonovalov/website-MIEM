data "yandex_vpc_network" "vkr_vpc_net" {
  name = "vkr-vpc-net"
}

data "yandex_vpc_subnet" "vkr_subnet" {
  name = "vkr-subnet"
}

resource "yandex_vpc_address" "vkr_public_ip" {
  name = "vkr-public-ip"
  deletion_protection = true
  external_ipv4_address {
    zone_id = var.zone
  }
}

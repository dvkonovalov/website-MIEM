resource "yandex_vpc_network" "vkr_vpc_net" {
  name = "vkr-vpc-net"
}

resource "yandex_vpc_subnet" "vkr_subnet" {
  name           = "vkr-subnet"
  zone           = var.zone
  network_id     = yandex_vpc_network.vkr_vpc_net.id
  v4_cidr_blocks = var.vpc_v4_networks
}

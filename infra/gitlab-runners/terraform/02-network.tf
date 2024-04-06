data "yandex_vpc_network" "vkr_vpc_net" {
  name = "vkr-vpc-net"
}

data "yandex_vpc_subnet" "vkr_subnet" {
  name = "vkr-subnet"
}

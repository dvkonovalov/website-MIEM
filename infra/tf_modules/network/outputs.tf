output "network" {
  value = yandex_vpc_network.vpc_net
}

output "subnet" {
  value = yandex_vpc_subnet.subnet
}

output "dns" {
  value = yandex_dns_zone.dns
}

resource "yandex_dns_zone" "vkr-dns" {
  zone             = "internal.rane."
  name             = "vkr-dns"
  public           = false
  private_networks = [yandex_vpc_network.vkr_vpc_net.id]
}

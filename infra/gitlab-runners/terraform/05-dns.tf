data "yandex_dns_zone" "vkr-dns" {
  name = "vkr-dns"
}

resource "yandex_dns_recordset" "gitlab_runner_dns" {
  zone_id      = data.yandex_dns_zone.vkr-dns.id
  name         = "gitlab-runner1.${data.yandex_dns_zone.vkr-dns.zone}"
  ttl          = 300

  data = [ yandex_compute_instance.gitlab_runner.network_interface.0.ip_address ]
  
  type = "A"
}

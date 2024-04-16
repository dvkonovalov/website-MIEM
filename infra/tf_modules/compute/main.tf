terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }

  required_version = ">= 0.13"
}

resource "yandex_compute_disk" "instance_disk" {
  name     = "${var.instance_name}-disk"
  type     = var.disk_type
  zone     = var.yandex_zone
  size     = var.disk_size
  image_id = var.os_image_id
}

resource "yandex_vpc_address" "public_ip" {
  count               = var.use_external_ip ? 1 : 0
  name                = "${var.instance_name}-public-ip"
  deletion_protection = true

  external_ipv4_address {
    zone_id = var.yandex_zone
  }
}

resource "yandex_compute_instance" "instance" {
  name        = var.instance_name
  platform_id = var.instance_platform_id
  hostname    = var.instance_name

  metadata    = {
    user-data = templatefile("${path.module}/templates/ssh-user.tftpl", { users = var.ssh_users })
  }

  resources {
    cores         = var.instance_cores
    core_fraction = var.instance_core_fraction
    memory        = var.instance_memory
  }

  boot_disk {
    disk_id = yandex_compute_disk.instance_disk.id
  }

  network_interface {
    subnet_id      = var.subnet.id
    nat            = var.use_external_ip
    nat_ip_address = var.use_external_ip ? yandex_vpc_address.public_ip[0].external_ipv4_address[0].address : null
  }
}

resource "yandex_dns_recordset" "instance_dns" {
  zone_id      = var.dns.id
  name         = "${var.instance_name}.${var.dns.zone}"
  ttl          = 300

  data = [ yandex_compute_instance.instance.network_interface.0.ip_address ]

  type = "A"
}

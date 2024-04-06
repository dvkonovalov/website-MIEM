data "template_file" "user_ssh_config" {
  template = file(var.instance_user_template)
  vars     = {
    ssh_user = var.ssh_user.user
    ssh_key  = var.ssh_user.key
  }
}

resource "yandex_compute_instance" "jump_host" {
  name = "jump-host"
  platform_id = var.instance_platform_id

  resources {
    cores         = var.instance_cores
    core_fraction = var.instance_core_fraction
    memory        = var.instance_memory
  }

  boot_disk {
    disk_id = yandex_compute_disk.jump_host_boot_disk.id
  }

  network_interface {
    subnet_id      = data.yandex_vpc_subnet.vkr_subnet.id
    nat            = true
    nat_ip_address = yandex_vpc_address.vkr_public_ip.external_ipv4_address[0].address
  }

  metadata = {
    user-data = data.template_file.user_ssh_config.rendered
  }
}

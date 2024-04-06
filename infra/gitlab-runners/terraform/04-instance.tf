data "template_file" "user_ssh_config" {
  template = file(var.instance_user_template)
  vars     = {
    ssh_user = var.ssh_user.user
    ssh_key  = var.ssh_user.key
  }
}

resource "yandex_compute_instance" "gitlab_runner" {
  name = "gitlab-runner"
  platform_id = var.instance_platform_id

  resources {
    cores         = var.instance_cores
    core_fraction = var.instance_core_fraction
    memory        = var.instance_memory
  }

  boot_disk {
    disk_id = yandex_compute_disk.gitlab_runner_boot_disk.id
  }

  network_interface {
    subnet_id = data.yandex_vpc_subnet.vkr_subnet.id
  }

  metadata = {
    user-data = data.template_file.user_ssh_config.rendered
  }
}
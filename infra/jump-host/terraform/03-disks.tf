resource "yandex_compute_disk" "jump_host_boot_disk" {
  name     = "jump-host-disk"
  type     = "network-hdd"
  zone     = var.zone
  size     = "20"
  image_id = var.os_image_id
}

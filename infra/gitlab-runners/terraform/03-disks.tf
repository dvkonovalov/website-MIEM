resource "yandex_compute_disk" "gitlab_runner_boot_disk" {
  name     = "gitlab-runner-disk"
  type     = "network-hdd"
  zone     = var.zone
  size     = "20"
  image_id = var.os_image_id
}

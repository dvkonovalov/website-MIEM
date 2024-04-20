variable "yandex_token" {
  description = "Yandex token"
  type        = string
  default     = "export TF_VAR_yandex_token=$(yc iam create-token)"
}

variable "yandex_zone" {
  description = "Yandex zone"
  type        = string
  default     = "ru-central1-a"
}

variable "yandex_cloud_id" {
  description = "Yandex cloud id"
  type        = string
  default     = "b1gqfq5hc348bvjtniug"
}

variable "yandex_folder_id" {
  description = "Yandex folder id"
  type        = string
  default     = "b1g6b2aabbvf4f103r9l"
}

variable "ssh_users" {
  description = "SSH users and their public keys"
  type        = list(object(
    {
      name=string
      public_key=string
    }))
}

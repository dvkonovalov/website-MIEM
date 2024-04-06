#========= Yandex Cloud variables =========#

variable "zone" {
  description = "Deafult zone"
  type        = string
  default     = "ru-central1-a"
}

variable "yandex_token" {
  description = "Yandex token"
  type        = string
  default     = "0000"
}

variable "yandex_cloud_id" {
  description = "Yandex cloud id"
  type        = string
  default     = "0000"
}

variable "yandex_folder_id" {
  description = "Yandex folder id"
  type        = string
  default     = "0000"
}

#========= Network variables =========#

variable "vpc_v4_networks" {
  description = "List of vpc IPv4 networks"
  type        = list(string)
  default     = [ "10.10.0.0/24" ]
}

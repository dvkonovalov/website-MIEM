variable "yandex_zone" {
  description = "Yandex zone"
  type        = string
}

variable "folder_id" {
  description = "Yandex folder id"
  type        = string
}

variable "subnet_name" {
  description = "Name of subnet. Use as names and prefixes"
  type = string
}

variable "dns_zone" {
  description = "Dns zone. Ends with `.`"
  type = string
}

variable "vpc_v4_networks" {
  description = "List of vpc IPv4 networks"
  type        = list(string)
  default     = [ "10.10.0.0/24" ]
}

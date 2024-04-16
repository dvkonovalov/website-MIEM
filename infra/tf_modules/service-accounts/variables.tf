variable "folder_id" {
  description = "Yandex folder id"
  type        = string
}

variable "service_accounts" {
  description = "List of service accounts to create"
  type        = list(object({
    name              = string
    description       = string
    role              = string
    create_static_key = bool
  }))
}

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

#========= Disks variables =========#

variable "os_image_id" {
  description = "Operating System image ID"
  type        = string
  default     = "fd833v6c5tb0udvk4jo6"
}

variable "disk_size" {
  description = "Size of disk (GiB)"
  type        = string
  default     = "20"
}

#========= Instance variables =========#

variable "instance_platform_id" {
  description = "Type of instance CPUs"
  type        = string
  default     = "standard-v2"
}

variable "instance_cores" {
  description = "Amount of CPU cores"
  type        = number
  default     = 2
}

variable "instance_core_fraction" {
  description = "Fraction per core, %"
  type        = number
  default     = 5
}

variable "instance_memory" {
  description = "Amount of memory, GiB"
  type        = number
  default     = 1
}

variable "instance_user_template" {
  description = "Template for adding user ssh.pub"
  type        = string
  default     = "../../terraform/templates/ssh-user.tftpl"
}

variable "ssh_users" {
  description = "SSH users and public keys of users"
  type        = list(object({ name=string, key=string }))
}

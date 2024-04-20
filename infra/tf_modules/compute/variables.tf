variable "yandex_zone" {
  description = "Yandex zone"
  type        = string
}

# === Network === #
variable "subnet" {
  description = "The subnet to add the VM to"
}

variable "dns" {
  description = "The DNS in which to make a record about the VM"
}

variable "use_external_ip" {
  description = "Create and link external IPv4?"
  type = bool
  default = false
}

# === Disks === #
variable "disk_type" {
  description = "Type of disk"
  type        = string
  default     = "network-hdd"
}

variable "disk_size" {
  description = "Size of disk (GiB)"
  type        = string
  default     = "20"
}

variable "os_image_id" {
  description = "Operating System image ID"
  type        = string
  default     = "fd833v6c5tb0udvk4jo6"
}

# === Instance === #
variable "instance_name" {
  description = "Name of instance"
  type        = string
}

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

# === Cloud Config == #
variable "ssh_users" {
  description = "SSH users and their public keys"
  type        = list(object(
    {
      name=string
      public_key=string
    }))
}

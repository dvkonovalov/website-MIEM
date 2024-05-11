variable "folder_id" {
  description = "Yandex folder id"
  type        = string
}

variable "cluster_name" {
  description = "Name of k8s cluster"
  type        = string
}

variable "subnet" {
  description = "The subnet to add the Cluster to"
}

variable "network" {
  description = "The network to add the Cluster to"
}

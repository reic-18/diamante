from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()

    def product_info(self):
        return f"{self.name} costs {self.price}"
        
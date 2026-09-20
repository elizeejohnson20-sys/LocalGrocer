require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Product = require('./models/Product')

const products = [
  // FRUITS & VEGETABLES
  {
    name: 'Fresh Tomatoes',
    category: 'Fruits & Vegetables',
    price: 40,
    unit: '1 kg',
    image:
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Potatoes',
    category: 'Fruits & Vegetables',
    price: 35,
    unit: '1 kg',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Fresh Apples',
    category: 'Fruits & Vegetables',
    price: 160,
    unit: '1 kg',
    image:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Bananas',
    category: 'Fruits & Vegetables',
    price: 60,
    unit: '1 dozen',
    image:
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Fresh Carrots',
    category: 'Fruits & Vegetables',
    price: 55,
    unit: '1 kg',
    image:
      'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=600&q=80',
  },

  // DAIRY & EGGS
  {
    name: 'Fresh Milk',
    category: 'Dairy & Eggs',
    price: 32,
    unit: '500 ml',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Farm Fresh Eggs',
    category: 'Dairy & Eggs',
    price: 75,
    unit: '12 eggs',
   image:
  'https://images.unsplash.com/photo-1692071097941-7d652f89d650?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Fresh Curd',
    category: 'Dairy & Eggs',
    price: 45,
    unit: '500 g',
   image:
    'https://images.unsplash.com/photo-1691043795570-9478750e7fd2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Paneer',
    category: 'Dairy & Eggs',
    price: 110,
    unit: '200 g',
     image:
    'https://images.unsplash.com/photo-1524239077444-27413e763bba?auto=format&fit=crop&w=600&q=80',
},
  {
    name: 'Butter',
    category: 'Dairy & Eggs',
    price: 58,
    unit: '100 g',
    image:
    'https://images.unsplash.com/photo-1603596310923-dbb12732f9c7?auto=format&fit=crop&w=600&q=80',
},
  // GRAINS & STAPLES
  {
    name: 'Basmati Rice',
    category: 'Grains & Staples',
    price: 180,
    unit: '5 kg',
    image:
         'https://images.orientbazar24.com/item/images/2014809/middle/AdobeStock-169388921.jpeg',
  },
  {
    name: 'Wheat Flour',
    category: 'Grains & Staples',
    price: 240,
    unit: '5 kg',
    image:
  'https://healthymiller.com/cdn/shop/files/MPFreshAtta.png?v=1693587203',
  },
  {
    name: 'Toor Dal',
    category: 'Grains & Staples',
    price: 145,
    unit: '1 kg',
    image:
  'https://organicmandya.com/cdn/shop/files/Tur_Dal.jpg?v=1739443020&width=1000',
  },
  {
    name: 'Sugar',
    category: 'Grains & Staples',
    price: 48,
    unit: '1 kg',
    image:
  'https://murukali.com/cdn/shop/files/White-Sugar-kg-murukali-com-1975_1200x1200_crop_center.jpg?v=1744977658',  },
  {
    name: 'Cooking Salt',
    category: 'Grains & Staples',
    price: 25,
    unit: '1 kg',
    image:
  'https://images.squarespace-cdn.com/content/v1/647663bc33f03764e7d03fa8/c4ef41db-9193-4e39-b81f-42310236b5b9/table%2Bsalt.png',
  },

  // SNACKS & BEVERAGES
  {
    name: 'Chocolate Biscuits',
    category: 'Snacks & Beverages',
    price: 40,
    unit: '200 g',
    image:
    'https://images.unsplash.com/photo-1558612881-41177ce9a61b?auto=format&fit=crop&w=600&q=80',

},
  {
    name: 'Potato Chips',
    category: 'Snacks & Beverages',
    price: 30,
    unit: '100 g',
    image:
    'https://www.meijer.com/content/dam/meijer/product/0713/73/3467/09/0713733467094_0_A1C1_0600.jpg',
  },
  {
    name: 'Orange Juice',
    category: 'Snacks & Beverages',
    price: 95,
    unit: '1 L',
    image:
    'https://images.unsplash.com/photo-1682423258049-26b18b2850a8?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Tea',
    category: 'Snacks & Beverages',
    price: 145,
    unit: '250 g',
    image:
    'https://images.unsplash.com/photo-1769893854321-7b0951695080?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Coffee',
    category: 'Snacks & Beverages',
    price: 180,
    unit: '200 g',
    image:
    'https://images.unsplash.com/photo-1671225137978-aa9a19071b9a?auto=format&fit=crop&w=600&q=80',
  },

  // HOUSEHOLD
  {
    name: 'Dishwash Liquid',
    category: 'Household',
    price: 95,
    unit: '500 ml',
    image:
    'https://bf1af2.akinoncloudcdn.com/products/2025/08/25/342775/6530b074-0e7f-4098-af7e-2906a239ea13_size3840_cropCenter.jpg',
  },
  {
    name: 'Laundry Detergent',
    category: 'Household',
    price: 210,
    unit: '2 kg',
    image:
    'https://m.media-amazon.com/images/I/41MC6bZ5VNL._SL500_.jpg',
  },
  {
    name: 'Floor Cleaner',
    category: 'Household',
    price: 125,
    unit: '1 L',
    image:
    'https://myfabulosa.co.uk/cdn/shop/files/lemon--floor-cleaner.jpg?v=1717666807&width=1100',
  },
  {
    name: 'Tissue Paper',
    category: 'Household',
    price: 75,
    unit: '4 rolls',
    image:
    'https://i.ebayimg.com/images/g/0woAAOSwCXBe~y66/s-l1200.jpg',
  },
  {
    name: 'Garbage Bags',
    category: 'Household',
    price: 90,
    unit: '30 bags',
    image:
    'https://m.media-amazon.com/images/I/71pY2p0eJwL._AC_SL1500_.jpg',
  },

  // PERSONAL CARE
  {
    name: 'Shampoo',
    category: 'Personal Care',
    price: 180,
    unit: '340 ml',
    image:
    'https://images.unsplash.com/photo-1613737673578-8af01fe0e05b?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Bath Soap',
    category: 'Personal Care',
    price: 55,
    unit: '125 g',
    image:
    'https://images.unsplash.com/photo-1607006482731-93bb2ed90a87?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Toothpaste',
    category: 'Personal Care',
    price: 95,
    unit: '150 g',
    image:
    'https://www.publicgoods.com/cdn/shop/files/toothpaste_packshot.webp?v=1756235119',
  },
  {
    name: 'Conditioner',
    category: 'Personal Care',
    price: 165,
    unit: '180 ml',
    image:
    'https://www.muji.us/cdn/shop/products/PublicGoodsMUJI_Product_SQ-1_1200x1200.jpg?v=1762446161',
  },
  {
    name: 'Face Wash',
    category: 'Personal Care',
    price: 140,
    unit: '100 ml',
    image:
    'https://api.muji.com.vn/media/catalog/product/cache/2e9290695da361a7d6192a4c8c689807/4/5/4548076022244_04_org_1.jpg',
  },
]

async function seedProducts() {
  try {
    await connectDB()

    for (const product of products) {
      await Product.findOneAndUpdate(
        { name: product.name },
        product,
        {
          upsert: true,
           returnDocument: 'after',
          setDefaultsOnInsert: true,
        }
      )
    }

    console.log(
      `Successfully seeded ${products.length} products.`
    )

    const totalProducts = await Product.countDocuments()

    console.log(
      `Total products in database: ${totalProducts}`
    )

    await mongoose.connection.close()
    console.log('MongoDB connection closed.')
  } catch (error) {
    console.error(
      'Product seeding failed:',
      error.message
    )

    await mongoose.connection.close()
    process.exit(1)
  }
}

seedProducts()
cube(`Category`, {
  sql: `SELECT * FROM public.category`,
  
  joins: {
    Buckets: {
      relationship: `belongsTo`,
      sql: `${Category}.id = ${Buckets}.id`
    },
    Overall: {
      relationship: `belongsTo`,
      sql: `${Overall}.id = ${Category}.id`
    },
    Sku: {
      relationship: `belongsTo`,
      sql: `${Sku}.id = ${Category}.id`
    },
    Taste: {
      relationship: `belongsTo`,
      sql: `${Taste}.id = ${Category}.id`
    },
    Texture: {
      relationship: `belongsTo`,
      sql: `${Texture}.id = ${Category}.id`
    }
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    category: {
      sql: `category`,
      type: `string`
    }
  }
});

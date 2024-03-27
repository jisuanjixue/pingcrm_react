# 它扩展了 Ruby 的内置 Array 类，添加了三个新的实例方法：totals、average 和 median。这些方法提供了对数组中元素进行统计分析的功能。

# totals 方法：
# 这个方法返回一个哈希，其中键是数组中的唯一元素，值是该元素在数组中出现的次数。
# 它使用 each_with_object 方法遍历数组中的每个元素，并将结果累积到一个哈希中。
# 如果哈希中已经存在当前元素作为键，它会增加该键对应的值；如果不存在，它会初始化该键的值为 0，然后增加 1。
# average 方法：
# 这个方法计算并返回数组中所有元素的平均值。
# 它首先检查数组是否为空，如果为空，返回 nil。
# 如果数组不为空，它会计算数组中所有元素的总和（sum），并将其转换为浮点数（to_f），然后除以数组的长度（count）来得到平均值。
# median 方法：
# 这个方法计算并返回数组中所有元素的中位数。
# 它首先检查数组是否为空，如果为空，返回 nil。
# 如果数组不为空，它会对数组进行排序（sort），然后根据数组的长度来计算中位数。
# 如果数组的长度是奇数，中位数就是中间的元素；如果数组的长度是偶数，中位数就是中间两个元素的平均值。
# 这些方法可以帮助你在处理数组数据时进行简单的统计分析，而无需引入额外的库或编写复杂的代码。通过扩展 Array 类，这些方法可以直接在任何数组对象上调用，提供了一种简洁且易于理解的方式来获取数组中的统计信息。

class Array
  def totals
    each_with_object({}) do |item, hash|
      hash[item] ||= 0
      hash[item] += 1
    end
  end

  def average
    return nil if empty?

    sum.to_f / count
  end

  def median
    return nil if empty?

    sorted = sort
    (sorted[(length - 1) / 2] + sorted[length / 2]) / 2.0
  end
end

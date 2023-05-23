const Subscription = require("../models/subscription-model");

class SubscriptionRepository {
  async createSubscription(userData) {
    try {
      const newSubscription = await Subscription.create(userData);
      return newSubscription;
    } catch (error) {}
  }

  async findSubscription(query, fieldToPopulate) {
    try {
      if (!fieldToPopulate) {
        const subscription = await Subscription.findOne(query);
        return subscription;
      }
      const subscription = await Subscription.findOne(query).populate(
        fieldToPopulate
      );
      return subscription;
    } catch (error) {}
  }

  async findSubscriptions(query) {
    try {
      const subscriptions = await Subscription.find(query);
      return subscriptions;
    } catch (error) {}
  }

  async updateSubscription(query, updatedData) {
    try {
      const updatedSubscription = await Subscription.findByIdAndUpdate(
        query,
        updatedData,
        {
          new: true,
        }
      );
      return updatedSubscription;
    } catch (error) {}
  }

  async deleteSubscription(query) {
    try {
      const deletedSubscription = await Subscription.findByIdAndDelete(query);
      return deletedSubscription;
    } catch (error) {}
  }
}

const subscriptionRepository = new SubscriptionRepository();
module.exports = subscriptionRepository;

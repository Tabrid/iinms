import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RegistedUser = sequelize.define("RegistedUser", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fatherName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouseName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imoNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  messengerId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alternateContact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nationalId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agrilCard: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  educationStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  village: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  block: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  union: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  upazila: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  division: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coordinates: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aez: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hotspot: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  csa: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  farmSize: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  landType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cultivationSeason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  majorCrops: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  croppingPattern: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  riceVarieties: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plantingMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  irrigationPractices: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fertilizerUsage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  soilType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avgProduction: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Stage-wise Crop Management
  plantingDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  seedlingAge: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  transplantationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  wateringStages: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  harvestDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  pestDiseases: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weedManagement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  majorInsects: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  majorDiseases: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  saaoName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  saaoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  progressiveFarmer: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  alternateContactRelation:{
    type: DataTypes.STRING,
    allowNull: true
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mediaType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mediaName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expertise: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailOfficial: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  majorClimateExtremes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalCultivatedArea:{
    type: DataTypes.STRING,
    allowNull: true
  },
  numberOfFarmers:{
    type: DataTypes.STRING,
    allowNull: true
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expectedHarvestPeriods:{
    type: DataTypes.JSON,
    allowNull: true
  },
  floweringDates:{
    type: DataTypes.JSON,
    allowNull: true
  },
  transplantingDates:{
    type: DataTypes.JSON,
    allowNull: true
  },
  seasonWiseDominantVarieties:{
    type: DataTypes.JSON,
    allowNull: true
  },
  communityInformation:{
    type: DataTypes.STRING,
    allowNull: true
  },
  irrigationSourceType:{
    type: DataTypes.STRING,
    allowNull: true
  },
  lan:{
    type: DataTypes.STRING,
    allowNull: true
  },
  lat:{
    type: DataTypes.STRING,
    allowNull: true
  },
  TSPUsage:{
    type: DataTypes.STRING,
    allowNull: true
  },
  MoPUsage:{
    type: DataTypes.STRING,
    allowNull: true
  },
  GypsumUsage:{
    type: DataTypes.STRING,
    allowNull: true
  },
  ZincUsage:{
    type: DataTypes.STRING,
    allowNull: true
  },
  dapUsage:{
    type: DataTypes.STRING,
    allowNull: true
  },
});
export default RegistedUser;
